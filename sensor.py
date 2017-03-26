import RPi.GPIO as GPIO
import time
import subprocess 
import webbrowser


pir_sensor = 11
piezo = 7

GPIO.setmode(GPIO.BOARD)
GPIO.setup(piezo, GPIO.OUT)


GPIO.setup(piezo, GPIO.OUT)
GPIO.setup(pir_sensor, GPIO.IN)
current_state = 0
try:
        
        
        while True:
                time.sleep(0.1)
                current_state = GPIO.input(pir_sensor)
                print("GPIO pin %s is %s" % (pir_sensor, current_state))

                #if  current_state == 0:
                        
                        

                if current_state == 1:
                        print("GPIO pin %s is %s" % (pir_sensor, current_state))
                        p = subprocess.Popen(["firefox", "https://www.howtogeek.com/wp-content/uploads/2012/12/Plain-Black-Wallpaper.png"])   
                        GPIO.output(piezo, GPIO.HIGH)
                        time.sleep(3)
                        GPIO.output(piezo, False)
                        time.sleep(2)
except KeyboardInterrupt:
        pass
finally:
        GPIO.cleanup()