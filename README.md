# Coiote to LwM2M Asset Tracker v2

[![Test and Release](https://github.com/MLopezJ/coiote-to-asset-tracker-v2/actions/workflows/test-and-release.yaml/badge.svg)](https://github.com/MLopezJ/coiote-to-asset-tracker-v2/actions/workflows/test-and-release.yaml)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

> Convert the LwM2M JSON encoding written by AVSystem's Coiote Azure integration
> to LwM2M Asset Tracker v2 JSON encoding

## Installation

```
npm install
```

## Test

```
npm test
```

## Coverage

```
npm test -- --coverage
```

## Expected input

Result of the
[integration](https://github.com/MLopezJ/thingy91-coiote-cloud-connection)
between Coiote and Azure.

```json
{
  "deviceId": "urn:imei:000000000000008",
  "etag": "AAAAAAAAAAE=",
  "deviceEtag": "MTMwNTk1MzI2",
  "status": "enabled",
  "statusUpdateTime": "0001-01-01T00:00:00Z",
  "connectionState": "Connected",
  "lastActivityTime": "0001-01-01T00:00:00Z",
  "cloudToDeviceMessageCount": 0,
  "authenticationType": "sas",
  "x509Thumbprint": {
    "primaryThumbprint": null,
    "secondaryThumbprint": null
  },
  "modelId": "",
  "version": 7,
  "properties": {
    "desired": {
      "$metadata": {
        "$lastUpdated": "2023-07-05T14:35:14.759071Z"
      },
      "$version": 1
    },
    "reported": {
      "lwm2m": {
        "1": {
          "0": {
            "0": {
              "value": 1
            },
            "1": {
              "value": 50
            },
            "6": {
              "value": false
            },
            "7": {
              "value": "U"
            },
            "16": {
              "value": true
            },
            "23": {
              "value": false
            }
          }
        },
        "3": {
          "0": {
            "0": {
              "value": "Nordic Semiconductor"
            },
            "1": {
              "value": "Thingy:91"
            },
            "2": {
              "value": "351358815340515"
            },
            "3": {
              "value": "22.8.1+0"
            },
            "11": {
              "0": {
                "value": 0
              },
              "attributes": {
                "dim": "1"
              }
            },
            "13": {
              "value": 1675874731000
            },
            "16": {
              "value": "UQ"
            },
            "19": {
              "value": "3.2.1"
            }
          }
        },
        "4": {
          "0": {
            "0": {
              "value": 6
            },
            "1": {
              "0": {
                "value": 6
              },
              "1": {
                "value": 7
              },
              "attributes": {
                "dim": "2"
              }
            },
            "2": {
              "value": -85
            },
            "3": {
              "value": 23
            },
            "4": {
              "0": {
                "value": "10.160.120.155"
              },
              "attributes": {
                "dim": "1"
              }
            },
            "8": {
              "value": 34237196
            },
            "9": {
              "value": 2
            },
            "10": {
              "value": 242
            }
          },
          "attributes": {
            "ver": "1.2"
          }
        },
        "5": {
          "0": {
            "0": { "value": "1.0.0" },
            "1": {
              "value": ""
            },
            "3": {
              "value": 0
            },
            "5": {
              "value": 1
            },
            "8": {
              "0": {
                "value": 0
              },
              "1": {
                "value": 1
              },
              "attributes": {
                "dim": "2"
              }
            },
            "9": {
              "value": 2
            }
          }
        },
        "6": {
          "0": {
            "0": { "value": -43.5723 },
            "1": { "value": 153.2176 },
            "2": { "value": 2 },
            "3": {},
            "5": { "value": 1665149633 },
            "6": { "value": 5 }
          }
        },
        "3303": {
          "0": {
            "5601": {
              "value": 27.18
            },
            "5602": {
              "value": 27.71
            },
            "5700": {
              "value": 27.18
            },
            "5701": {
              "value": "Cel"
            }
          }
        },
        "3304": {
          "0": {
            "5601": {
              "value": 23.535
            },
            "5602": {
              "value": 24.161
            },
            "5700": {
              "value": 24.057
            },
            "5701": {
              "value": "%RH"
            }
          }
        },
        "3313": {
          "0": {
            "5701": {
              "value": "m/s2"
            },
            "5702": {
              "value": -0.372652
            },
            "5703": {
              "value": -0.117679
            },
            "5704": {
              "value": -9.012311
            }
          }
        },
        "3315": {
          "0": {
            "5601": {
              "value": 101697
            },
            "5602": {
              "value": 101705
            },
            "5700": {
              "value": 101705
            },
            "5701": {
              "value": "Pa"
            }
          }
        },
        "3347": {
          "0": {
            "5500": {
              "value": false
            },
            "5501": {
              "value": 0
            },
            "5750": {
              "value": "Button 0"
            }
          }
        },
        "3420": {
          "0": {
            "1": {
              "value": "#000000"
            }
          }
        },
        "10256": {
          "0": {
            "0": {
              "value": 428
            },
            "2": {
              "value": 6300
            },
            "3": {
              "value": 52
            },
            "4": {
              "value": 14
            },
            "5": {
              "value": 0
            }
          }
        },
        "50001": {
          "0": {
            "0": {
              "value": 5
            },
            "1": {
              "value": 128
            },
            "6": {},
            "7": {
              "value": "403"
            },
            "8": {},
            "9": {},
            "10": {},
            "11": {}
          }
        },
        "50009": {
          "0": {
            "0": {
              "value": true
            },
            "2": {
              "value": 120
            },
            "3": {
              "value": 600
            },
            "4": {
              "value": 7200
            },
            "1": {
              "value": 120
            },
            "5": {
              "value": 8.5
            },
            "8": {
              "value": 2.5
            },
            "9": {
              "value": 0.5
            }
          }
        }
      },
      "$metadata": {
        "lwm2m": {
          "3347": {
            "0": {
              "5501": {
                "$lastUpdated": "2023-07-07T12:11:03.0324459Z",
                "value": {
                  "$lastUpdated": "2023-07-07T12:11:03.0324459Z"
                }
              },
              "5750": {
                "$lastUpdated": "2023-07-07T12:11:03.0324459Z",
                "value": {
                  "$lastUpdated": "2023-07-07T12:11:03.0324459Z"
                }
              },
              "$lastUpdated": "2023-07-07T12:11:03.0324459Z"
            },
            "$lastUpdated": "2023-07-07T12:11:03.0324459Z"
          },
          "$lastUpdated": "2023-07-07T12:11:03.0324459Z"
        }
      }
    },
    "$version": 6
  },
  "capabilities": {
    "iotEdge": false
  }
}
```

full device twin object here: [input.js](documents/input.ts)

## Expected output

```typescript
import {
  Device_3_urn,
  ConnectivityMonitoring_4_urn,
  Location_6_urn,
  Temperature_3303_urn,
  Humidity_3304_urn,
  Pressure_3323_urn,
} from "@nordicsemiconductor/lwm2m-types";
import { Config_50009_urn } from "schemas/Config_50009";

export const output = {
  [Device_3_urn]: {
    "0": "Nordic Semiconductor ASA",
    "1": "Thingy:91",
    "2": "351358815340515",
    "3": "22.8.1+0",
    "11": [0],
    "13": 1675874731000,
    "16": "UQ",
    "19": "3.2.1",
  },

  [ConnectivityMonitoring_4_urn]: {
    "0": 6,
    "1": [6, 7],
    "2": -85,
    "3": 23,
    "4": ["10.160.120.155"],
    "8": 34237196,
    "9": 2,
    "10": 242,
    "12": 12,
  },

  [Location_6_urn]: {
    "0": -43.5723,
    "1": 153.2176,
    "2": 2,
    "5": 1665149633,
    "6": 5,
  },

  [Temperature_3303_urn]: [
    {
      "5601": 27.18,
      "5602": 27.71,
      "5700": 27.18,
      "5701": "Cel",
    },
  ],

  [Humidity_3304_urn]: [
    {
      "5601": 23.535,
      "5602": 24.161,
      "5700": 24.057,
      "5701": "%RH",
    },
  ],

  [Pressure_3323_urn]: [
    {
      "5601": 101697,
      "5602": 101705,
      "5700": 10,
      "5701": "Pa",
    },
  ],

  [Config_50009_urn]: {
    "0": true,
    "2": 120,
    "3": 600,
    "4": 7200,
    "1": 120,
    "5": 8.5,
    "8": 2.5,
    "9": 0.5,
  },
};
```

Expected output here: [output.js](documents/output.ts)

## Example

```TypeScript
import type { deviceTwin } from './converter.js'
import { converter } from './converter.js'
const deviceTwin = {} // ... full device twin
const result = await converter(deviceTwin)
console.log(result)
```

See [example.js](./src/example.ts) for more details.
