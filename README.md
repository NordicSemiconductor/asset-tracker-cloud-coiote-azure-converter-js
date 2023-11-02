# Coiote LwM2M JSON encoding to nRF Asset Tracker LwM2M JSON encoding [![npm version](https://img.shields.io/npm/v/@nordicsemiconductor/coiote-azure-converter.svg)](https://www.npmjs.com/package/@nordicsemiconductor/coiote-azure-converter)

[![Test and Release](https://github.com/NordicSemiconductor/asset-tracker-cloud-coiote-azure-converter-js/actions/workflows/test-and-release.yaml/badge.svg)](https://github.com/NordicSemiconductor/asset-tracker-cloud-coiote-azure-converter-js/actions/workflows/test-and-release.yaml)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![@commitlint/config-conventional](https://img.shields.io/badge/%40commitlint-config--conventional-brightgreen)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

Convert the LwM2M JSON encoding written by
[AVSystem's Coiote Azure integration](https://iotdevzone.avsystem.com/docs/Cloud_integrations/Azure_IoT/Azure_IoT_Hub/Configure_Azure_IoT_Hub_integration/)
to
[nRF Asset Tracker's LwM2M JSON encoding](https://github.com/NordicSemiconductor/lwm2m-types-js).

## `AssetTrackerv2` firmware to `LwM2M Asset Tracker v2` through `Coiote-Azure` objects version mapping

| Name                    | AssetTrackerv2 Firmware                                                                                                                         | Coiote-Azure                                                                                        | LwM2M Asset Tracker v2 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------- |
| Device                  | [3:1.2@1.1](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3-1_2.xml)                                           | 3:1.2@1.1                                                                                           | 3:1.2@1.1              |
| Connectivity Monitoring | [4:1.3@1.1](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/4-1_3.xml)                                           | 4:1.3@1.1                                                                                           | 4:1.3@1.1              |
| Location                | [6](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/6-1_0.xml)                                                   | 6                                                                                                   | 6                      |
| Temperature             | [3303:1.1](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3303-1_1.xml)                                         | [3303](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3303-1_0.xml) | 3303:1.1               |
| Humidity                | [3304:1.1](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3304-1_1.xml)                                         | [3304](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3304-1_0.xml) | 3304:1.1               |
| Pressure                | [3323:1.1](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3323-1_1.xml)                                         | [3323](https://github.com/OpenMobileAlliance/lwm2m-registry/blob/prod/version_history/3323-1_0.xml) | 3323:1.1               |
| Config                  | [50009](https://github.com/nrfconnect/sdk-nrf/blob/v2.4.0/applications/asset_tracker_v2/src/cloud/lwm2m_integration/config_object_descript.xml) | 50009                                                                                               | 50009                  |

Where "`:`" indicates the **object** version and "`@`" indicates the **LwM2M**
version. if not present, values will be the default option. Default **LwM2M**
version is `1.0`. Default **object** version is `1.0`.

## Installation

```
npm install --save-exact
```

## Running the tests

After cloning the repository:

```
npm ci
npm test
```

## Example usage

```TypeScript
import { converter } from './converter.js'
const deviceTwin = {} // ... full device twin
const result = await converter(deviceTwin)
console.log(result)
```

See [./src/example.ts](./src/example.ts) for more details.

## Expected input

Result of the integration between Coiote and Azure.

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
        "3": {
          "0": {
            "0": {
              "value": "Nordic Semiconductor ASA"
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
            "7": {
              "0": {
                "value": 80
              },
              "attributes": {
                "dim": "1"
              }
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
              "value": 1675874731
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
            },
            "12": {
              "value": 12
            }
          },
          "attributes": {}
        },
        "6": {
          "0": {
            "0": { "value": -43.5723 },
            "1": { "value": 153.2176 },
            "2": { "value": 2 },
            "3": { "value": 24.798573 },
            "5": { "value": 1665149633 },
            "6": { "value": 5 }
          }
        },
        "3303": {
          "0": {
            "5700": {
              "value": 15
            }
          }
        },
        "3304": {
          "0": {
            "5700": {
              "value": 30
            }
          }
        },
        "3323": {
          "0": {
            "5601": {
              "value": 101697
            },
            "5602": {
              "value": 101705
            },
            "5700": {
              "value": 10
            },
            "5701": {
              "value": "Pa"
            }
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
              "value": 60
            },
            "5": {
              "value": 8.5
            },
            "6": {
              "value": true
            },
            "7": {
              "value": true
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
        "lwm2m": {}
      }
    },
    "$version": 6
  },
  "capabilities": {
    "iotEdge": false
  }
}
```

full device twin object here:
[./src/deviceTwinExample.json](./src/deviceTwinExample.json)

## Expected output

```typescript
export const output = {
  "6": {
    "0": -43.5723,
    "1": 153.2176,
    "2": 2,
    "3": 24.798573,
    "5": 1665149633,
    "6": 5,
  },
  "50009": {
    "0": true,
    "1": 60,
    "2": 120,
    "3": 600,
    "4": 7200,
    "5": 8.5,
    "6": true,
    "7": true,
    "8": 2.5,
    "9": 0.5,
  },
  "3:1.2@1.1": {
    "0": "Nordic Semiconductor ASA",
    "1": "Thingy:91",
    "2": "351358815340515",
    "3": "22.8.1+0",
    "7": [80],
    "11": [0],
    "13": 1675874731,
    "16": "UQ",
    "19": "3.2.1",
  },
  "4:1.3@1.1": {
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
  "3303:1.1": [{ "5518": 1692369551, "5700": 15 }],
  "3304:1.1": [{ "5518": 1692369551, "5700": 30 }],
  "3323:1.1": [
    {
      "5518": 1692369551,
      "5601": 101697,
      "5602": 101705,
      "5700": 10,
      "5701": "Pa",
    },
  ],
};
```

## Architecture decision records (ADRs)

See [./adr](./adr/).
