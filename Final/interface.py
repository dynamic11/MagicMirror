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
displayTimeout=20
pir_sensor = 18
displayOff=0


state=1
timeout=0

def refreshPage ():
    k.press_key(k.control_key)
    #k.press_key(k.shift_key)
    k.tap_key('R')
    k.release_key(k.control_key)
    #k.release_key(k.shift_key)

def changeState (nextState):
    if nextState == 0:
        #display display black
        shutil.copy2('pages/index_black.html', "index.html")
        refreshPage ()
    elif nextState == 1:
        #display display black
        shutil.copy2('pages/index_dash.html', "index.html")
        refreshPage ()
    elif nextState == 2:
        #display display black
        shutil.copy2('pages/index_mood.html', "index.html")
        refreshPage ()
        

GPIO.setup(button1, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(button2, GPIO.IN, GPIO.PUD_UP)
GPIO.setup(switch, GPIO.IN, GPIO.PUD_UP)

GPIO.setup(pir_sensor, GPIO.IN)


print("Initializing...")
time.sleep(1)
while True:
    button1_state = GPIO.input(button1)
    button2_state = GPIO.input(button2)
    switch_state = GPIO.input(switch)
    motion = GPIO.input(pir_sensor)
    #check if master switch is on or off
    if switch_state == GPIO.HIGH:
        print("Display OFF")
        timeout=0
        #if display is currently ON then turn OFF
        if state != 0: 
            changeState(0)
            state=0
    else:
        print("Display ON")
        print("motion:")
        print(motion)
        print("timeout:")
        print(timeout)

        #check if motion is detected
        #if no motion is detected for 20s screen will go black
        if motion==0:
            if timeout==displayTimeout:
                #PIR request to disable display 
                displayOff=1
                timeout =0
            else:
                #incerement timout timer
                timeout=timeout+1
        else:
            timeout=0

        #if button 1 (Dash) is pressed or screen is off and the motion sensor
        #hasnt requested to turn off then turn ON dash
        if (button1_state != GPIO.HIGH or state == 0)and displayOff==0:
            if state != 1: 
                changeState(1)
                state=1
                timeout=0
        #if button 2 (mood) is pressed and screen is already not set to mood
        #then go to mood
        elif button2_state != GPIO.HIGH and state != 2: 
            changeState(2)
            state=2
            timeout=0
        #if display off is requested from PIR and screen is off then disable
        #display
        elif displayOff and state != 0:
            changeState(0)
            state=0
            print("********************")
        #if display off is requested from PIR and screen is off then disable
        #display
        elif motion==1 and state == 0:
            changeState(1)
            state=1
            print("&&&&&&&&&&&")
            timeout=0
            displayOff=0
    time.sleep(0.5)
GPIO.cleanup()
