import threading
import simpleDDOS

for i in range(1000):
    thread = threading.Thread(target=simpleDDOS.attack)
    thread.start()