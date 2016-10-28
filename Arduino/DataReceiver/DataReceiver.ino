/*********** Data Receiver ***********/
/*     For Raspberry side Arduino    */
/*************************************/

#include <SoftwareSerial.h>
#include <Wire.h>

// Sensor Types
#define TYPE_SMOKE 0x01
#define TYPE_NOISE 0x02
#define TYPE_MULTI 0x03

/*********** SELECT SENSOR TYPE ***********/
#define SENSOR_TYPE TYPE_SMOKE
/******************************************/

// I2C Address
#define I2C_ADDR_SMKOE 0x01
#define I2C_ADDR_NOISE 0x02
#define I2C_ADDR_MULTI 0x03

SoftwareSerial gwSerial(11, 12); // RX, TX

// Little endian 2 bytes
// 0x1234 -> 34, 12
byte *data; // Data(array) to be relayed
byte *dataBack; // copy data
unsigned int dataSize; // Size in bytes

void setup() {
  Serial.begin(115200);
  Serial.println("Start");
  gwSerial.begin(9600);

  byte i2cAddress;

  switch (SENSOR_TYPE) {
    case TYPE_SMOKE:
      Serial.println("Smoke sensor!");
      dataSize = 2;
      i2cAddress = I2C_ADDR_SMKOE;
      break;
    case TYPE_NOISE:
      Serial.println("Noise sensor!");
      dataSize = 2;
      i2cAddress = I2C_ADDR_NOISE;
      break;
    case TYPE_MULTI:
      Serial.println("Multi sensor!");
      dataSize = 6;
      i2cAddress = I2C_ADDR_MULTI;
      break;
    default:
      break;
  }

  data = new byte[dataSize];
  dataBack = new byte[dataSize];
  Wire.begin(i2cAddress);
  Wire.onRequest(onRequest);
}

void loop() {
  if (gwSerial.available()) {
    for (int i = 0 ; i < dataSize; i++)
      data[i] = gwSerial.read();
    Serial.print("Input <- ");
    printData(data);
  }


  if (data[dataSize - 1] != 0xFF) {          //Err : copy to dataBack
    for (int i = 0 ; i < dataSize; i++)
      dataBack[i] = data[i];
  }
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

void onRequest() {
  if (data[dataSize - 1] == 0xFF) {                    //0xFF is Err
    Serial.print("onRequest()");
    Wire.write(dataBack, dataSize);
    Serial.print("Output(back DATA) -> ");
    printData(dataBack);
  }
  else {
    Serial.print("onRequest()");
    Wire.write(data, dataSize);
    Serial.print("Output -> ");
    printData(data);
  }
  delay(100);
}
