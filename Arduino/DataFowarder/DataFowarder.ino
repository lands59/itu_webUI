/*********** Data Fowrarder ***********/
/*       For sensor side Arduino      */
/**************************************/

#include <SoftwareSerial.h>
#include <Wire.h>

// Sensor Types
#define TYPE_SMOKE 0x01
#define TYPE_NOISE 0x02
#define TYPE_MULTI 0x03

/*********** SELECT SENSOR TYPE ***********/
#define SENSOR_TYPE TYPE_SMOKE
/******************************************/

// Common Pins
#define PIN_LED_GREEN 2
#define PIN_LED_RED 3

#define PIN_LED_SWITCH 4
#define PIN_SWITCH 5

// Type Dependancy Pins
//#define PIN_SMOKE 6
#define PIN_SMOKE A0

#define PIN_NOISE A0

#define PIN_TEMPHUMID A0
#define PIN_BRIGHT A2

// Serial Port
SoftwareSerial gwSerial(11, 12); // RX, TX

// Little endian 2 bytes
// 0x1234 -> 34, 12
unsigned int *data; // Data(array) to be sent
unsigned int dataSize; // Size in bytes

int lastSwitchVal = HIGH; // Raw value of the switch
boolean switchToggled = false; // True, when the value is changed 1 to 0
boolean errorStatus = false; // True, if the switch is toggled to red LED

// smoke setup value
int smokeDefault;

void setup() {
  Serial.begin(115200);
  Serial.println("Start");

  gwSerial.begin(9600);

  pinMode(PIN_LED_GREEN, OUTPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_LED_SWITCH, OUTPUT);
  pinMode(PIN_SWITCH, INPUT_PULLUP);

  switch (SENSOR_TYPE) {
    case TYPE_SMOKE:
      Serial.println("Smoke sensor!");
      pinMode(PIN_SMOKE, INPUT_PULLUP);

      // value set!!
      delay(5000);
      smokeDefault = analogRead(PIN_SMOKE);
      Serial.print("Smoke sensor set value=");
      Serial.println(smokeDefault);

      // Smoke sensor : Green LED should be turned on always
      digitalWrite(PIN_LED_GREEN, HIGH);
      dataSize = 2;
      break;
    case TYPE_NOISE:
      Serial.println("Noise sensor!");
      dataSize = 2;
      break;
    case TYPE_MULTI:
      Serial.println("Multi sensor!");
      dataSize = 6;
      break;
    default:
      break;
  }

  data = new unsigned int[dataSize / 2];

  delay(100);
}

// Test
int led;

void loop() {
  byte * buffer = getData();
  printData(buffer);
  gwSerial.write(buffer, dataSize);

  // TEST
  //setErrorStatus(led++ % 2 == 0);

  if (isPushed())
    errorStatus = !errorStatus;
  setErrorStatus(errorStatus);

  delay(100);

}

void printData(byte* data) {
  Serial.print("[");
  for (int i = 0; i < dataSize; i++) {
    Serial.print(data[i], HEX);
    Serial.print(", ");
  }
  Serial.println("]");
}

byte* getData() {
  switch (SENSOR_TYPE) {
    case TYPE_SMOKE:
      getSmoke();
      break;
    case TYPE_NOISE:
      getNoise();
      break;
    case TYPE_MULTI:
      getMulti();
      break;
    default:
      break;
  }

  return (byte *)data;
}

void getSmoke() {
  //int smoke = digitalRead(PIN_SMOKE); // TODO : Your calculating codes, Check HIGH/LOW
  int smoke = analogRead(PIN_SMOKE); // TODO : Your calculating codes, Check HIGH/LOW
  Serial.print("SmokeAnalog : ");
  Serial.println(smoke);

  int smokeSend = 0;                 //Change value(smoke). 1 is detect!!

  //if(smoke>=(smokeDefault+12)) {                   // ******** Smoke Control val
  if (smoke >= 270) {                // ******** Smoke Control val
    smokeSend = 1;
    digitalWrite(PIN_LED_RED, HIGH);
  }
  else digitalWrite(PIN_LED_RED, LOW);
  if (isErrorStatus()) {
    Serial.print('*');
    smokeSend = 1;
  }
  //Serial.print("Smoke : ");
  //Serial.println(smokeSend);


  if (smokeSend <= 1)  data[0] = (unsigned int) smokeSend;
}

void getNoise() {
  unsigned int rawNoise = analogRead(PIN_NOISE);
  float noise = rawNoise / 1; // TODO : Your calculating codes

  if (isErrorStatus()) {                  // malfunction
    Serial.print('*');
    noise = 90.0;
  }

  if (noise > 100) {                   //Sensor Led control.
    noise = 100;
    digitalWrite(PIN_LED_GREEN, LOW);
    delay(10);
    digitalWrite(PIN_LED_RED, HIGH);
    delay(10);
  }
  else if (noise > 70) {
    digitalWrite(PIN_LED_GREEN, LOW);
    delay(10);
    digitalWrite(PIN_LED_RED, HIGH);
    delay(10);
  }

  else if (noise <= 70) {
    digitalWrite(PIN_LED_GREEN, HIGH);
    delay(10);
    digitalWrite(PIN_LED_RED, LOW);
    delay(10);
  }

  //  else  digitalWrite(PIN_LED_GREEN, HIGH);
  Serial.print("Noise : ");
  Serial.println(noise);

  if (noise <= 100)   data[0] = (unsigned int) noise;
}

void getMulti() {

  unsigned int rawTemphumid = analogRead(PIN_TEMPHUMID);
  unsigned int rawBright = analogRead(PIN_BRIGHT);

  float temphumid = (float) rawTemphumid * 3.307 / 1023 ;
  float temp = -66.875 + (218.75 * temphumid / 3.307);
  float humid = -12.5 + 125 * (temphumid / 3.307);

  float bright = (float)rawBright / 1023 * 100;

  if (isErrorStatus()) {
    Serial.print('*');
    temp = 65.0;
  }

  if (temp > 60) {
    digitalWrite(PIN_LED_GREEN, LOW);
    delay(10);
    digitalWrite(PIN_LED_RED, HIGH);
    delay(10);
  }
  else {
    digitalWrite(PIN_LED_GREEN, HIGH);
    delay(10);
    digitalWrite(PIN_LED_RED, LOW);
    delay(10);
  }
  Serial.print("Temp : ");
  Serial.print(temp);
  Serial.print("   Humid : ");
  Serial.print(humid);
  Serial.print("   Bright : ");
  Serial.println(bright);

  if (temp <= 150)   data[0] = (unsigned int) temp;
  if (humid <= 100)  data[1] = (unsigned int) humid;
  if (bright <= 100) data[2] = (unsigned int) bright;
}

boolean isPushed() {
  int val = digitalRead(PIN_SWITCH);
  Serial.print("Switch pushed : ");
  Serial.println(val);
  if (lastSwitchVal != val) {
    switchToggled = val == HIGH;
  } else {
    switchToggled = false;
  }
  lastSwitchVal = val;
  return switchToggled;
}

boolean isErrorStatus() {
  return errorStatus;
}

void setErrorStatus(boolean error) {
  if (error) {
    if (SENSOR_TYPE != TYPE_SMOKE) {
      digitalWrite(PIN_LED_GREEN, LOW);
      delay(10);
    }
    digitalWrite(PIN_LED_RED, HIGH);
    delay(10);
    digitalWrite(PIN_LED_SWITCH, HIGH);
    delay(10);
    digitalWrite(PIN_SWITCH, HIGH);
  }
  else {
    if (SENSOR_TYPE != TYPE_SMOKE) {
      digitalWrite(PIN_LED_GREEN, HIGH);
      delay(10);
    }
    digitalWrite(PIN_LED_RED, LOW);
    delay(10);
    digitalWrite(PIN_LED_SWITCH, LOW);
    delay(10);
  }
}
