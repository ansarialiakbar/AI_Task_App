import redis
import os
from dotenv import load_dotenv
from app.db import tasks_collection
from app.operations import process_task
from bson import ObjectId

load_dotenv()

# Redis connection
redis_url = os.getenv("REDIS_URL")

if redis_url:
    # Production (Render)
    redis_client = redis.from_url(redis_url, decode_responses=True)
else:
    # Local / Docker
    redis_client = redis.Redis(
        host=os.getenv("REDIS_HOST", "127.0.0.1"),
        port=int(os.getenv("REDIS_PORT", 6379)),
        decode_responses=True
    )

# Queue name (same as backend BullMQ)
QUEUE_NAME = "taskQueue"


def update_task(task_id, update_data):
    tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": update_data}
    )


def worker():
    print("🚀 Worker started...")

    while True:
        task_id = None  #  prevent crash

        try:
            # Wait for job
            _, job_data = redis_client.blpop(QUEUE_NAME)

            #  job_data is directly taskId
            task_id = job_data

            print(f" Received Task ID: {task_id}")

            # Set status to running
            update_task(task_id, {
                "status": "running",
                "logs": "Task started"
            })

            # Fetch task from DB
            task = tasks_collection.find_one({"_id": ObjectId(task_id)})

            if not task:
                raise Exception("Task not found in DB")

            # Process task
            result = process_task(task["operation"], task["input"])

            # Update success
            update_task(task_id, {
                "status": "success",
                "result": result,
                "logs": "Task completed successfully"
            })

            print(f" Completed Task: {task_id}")

        except Exception as e:
            print(" Error:", str(e))

            if task_id:  #  avoid crash
                update_task(task_id, {
                    "status": "failed",
                    "logs": str(e)
                })


if __name__ == "__main__":
    worker()