# ADR 004: Timestamp Hierarchy for Temperature, Humidity and Pressure objects

It is known that Coiote does not support object version 1.1 for the following
LwM2M objects in its integration with Azure:

- Temperature (3303)
- Pressure (3304)
- Humidity (3323)
  > check
  > [objects version mapping](../README.md#assettrackerv2-firmware-to-lwm2m-asset-tracker-v2-through-coiote-azure-objects-version-mapping)
  > for more information.

Instead, Coiote uses version 1.0 as the object version by default. This means
that in the `device twin` object, the objects Temperature, Pressure and Humidity
will not have the resource `5518`, which is the one used for describe timestamps
in those objects.

In consequence, in the conversion process from Coiote to LwM2M is implemented
what is called "timestamp hierarchy", which is a mechanism to describe which
value should be used in the resource `5518` in case its original value is
undefined.

## Timestamp hierarchy levels

1. The value from resource `5518` of the object
2. `$lastUpdated` value from the **resource** `5700` of the object in device
   twin metadata
3. `$lastUpdated` value from the **instance** in device twin metadata
4. `$lastUpdated` value from the **object** in device twin metadata
5. `$lastUpdated` value from the **LwM2M** reported in device twin metadata

// TODO: improve the way the `Timestamp hierarchy levels` is described
