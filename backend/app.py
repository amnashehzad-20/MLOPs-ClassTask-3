from flask import Flask, request, jsonify
import redis
import json
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Connect to Redis
redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=int(os.getenv("REDIS_PORT", 6379)), decode_responses=True)

# Helper function to get tasks
def get_tasks():
    tasks_json = redis_client.get("tasks")
    return json.loads(tasks_json) if tasks_json else []

# Helper function to save tasks
def save_tasks(tasks):
    redis_client.set("tasks", json.dumps(tasks))

# API Routes
@app.route("/tasks", methods=["GET"])
def get_all_tasks():
    return jsonify(get_tasks())

@app.route("/tasks", methods=["POST"])
def add_task():
    tasks = get_tasks()
    data = request.get_json()
    new_task = {"id": len(tasks) + 1, "title": data["title"], "completed": False}
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify({"message": "Task added!"})

@app.route("/tasks/<int:task_id>/complete", methods=["PUT"])
def complete_task(task_id):
    tasks = get_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            save_tasks(tasks)
            return jsonify({"message": "Task updated!"})
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    tasks = get_tasks()
    tasks = [task for task in tasks if task["id"] != task_id]
    save_tasks(tasks)
    return jsonify({"message": "Task deleted!"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
