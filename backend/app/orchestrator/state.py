class AgentState:
    def __init__(self):
        self.status = "Idle"
        self.total_tasks = 0
        self.running_tasks = 0
        self.failed_tasks = 0
        self.avg_execution_time = 0.0
        self.queue_length = 0
        self.success_rate = 100.0
        self.retry_count = 0
        self.execution_times = []

state = AgentState()
