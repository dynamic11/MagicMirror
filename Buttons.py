import time
import subprocess 
import webbrowser
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

button1 = 4
button2 = 17

GPIO.setup(button1, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(button2, GPIO.IN, GPIO.PUD_UP)

while True:
    button1_state = GPIO.input(button1)
    button2_state = GPIO.input(button2)
    if button1_state == GPIO.HIGH: 
        print("HIGH")   
    else:
        print("LOW")
        #p.kill()
        p = subprocess.Popen(["firefox", "localhost:8000"])
        #url = 'http://www.nba.ca/'
        #webbrowser.open_new_tab(url + 'culearn/')
        #webbrowser.open_new(url)
        
    if button2_state == GPIO.HIGH:
        print("high")
    else:
        print("low")
        p.kill()
        p = subprocess.Popen(["firefox", "www.carleton.ca"])
        #webbrowser.open_new_tab(url + 'doc/')
        #webbrowser.close()
        #webbrowser.open_new(url)
    time.sleep(0.5)
