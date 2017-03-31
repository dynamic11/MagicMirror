import time
import subprocess 
import webbrowser
import RPi.GPIO as GPIO
import shutil
from pykeyboard import PyKeyboard
k= PyKeyboard()
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

button1 = 27
button2 = 22
switch = 10
state=1

def refreshPage ():
    k.press_key(k.control_key)
    #k.press_key(k.shift_key)
    k.tap_key('R')
    k.release_key(k.control_key)
    #k.release_key(k.shift_key)

GPIO.setup(button1, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(button2, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(switch, GPIO.IN, GPIO.PUD_UP)
time.sleep(1)
while True:
    button1_state = GPIO.input(button1)
    button2_state = GPIO.input(button2)
    switch_state = GPIO.input(switch)

    #check if master switch is on or off
    if switch_state == GPIO.HIGH:
        print("Display OFF")
        #if display is currently not off then turn off
        if state != 0: 
            #display display black
            shutil.copy2('pages/index_black.html', "index.html")
            refreshPage ()
            state=0
    else:
        print("Display ON")
        if button1_state != GPIO.HIGH or state == 0:
            if state != 1: 
                #turn display Dash
                shutil.copy2('pages/index_dash.html', "index.html")
                refreshPage ()
                state=1
        elif button2_state != GPIO.HIGH:
            if state != 2: 
                #turn display Dash
                shutil.copy2('pages/index_mood.html', "index.html")
                refreshPage ()
                state=2
    time.sleep(0.5)


