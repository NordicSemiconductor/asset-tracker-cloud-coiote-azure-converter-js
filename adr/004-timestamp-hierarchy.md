# ADR 004: Timestamp Hierarchy for Temperature, Humidity and Pressure objects

It is known that Coiote does not support version 1.1 for the following LwM2M
objects: Temperature (3303), Pressure (3304), and Humidity (3323). Instead,
Coiote uses version 1.0 by default. This means that in its integration with
Azure, the objects Temperature, Pressure and Humidity do not have the resource
5518, which is the one for describing timestamps.

In consequence, in the conversion process from Coiote to LwM2M is implemented
what is called "timestamp hierarchy", which is a mechanism to describe which
value should be used in case the resource 5518 is undefined.
