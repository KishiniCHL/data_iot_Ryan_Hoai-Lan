from machine import Pin,ADC
import utime
import ujson
import network
import urequests
import tm1637


wlan = network.WLAN(network.STA_IF)
wlan.active(True)
ssid = 'Kirby'
password = 'cochonrouge'
wlan.connect(ssid, password)
url = "http://192.168.84.144:3000/"
print(wlan.isconnected())

# while not wlan.isconnected():
#     print("Waiting for co")
#     utime.sleep(1)
#     pass



def connect():
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected() == False:
        print('Waiting for connection...')
        sleep(1)
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')
    return ip

try:
    ip = connect()
except KeyboardInterrupt:
    machine.reset()
    
    
mydisplay = tm1637.TM1637(clk=Pin(26), dio=Pin(27))
 
# Show a word
mydisplay.show("Pico")
utime.sleep(1)
