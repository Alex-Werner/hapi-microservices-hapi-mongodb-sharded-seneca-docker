# hapi-microservices-hapi-mongodb-sharded-seneca-docker
A playground repo to test and learn about how to create a microservices infrastructure using hapi, mongodb, seneca, hapi-seneca-plugin with docker and sharded database

## Architecture 

For now this is what this project is actually able to do. 

+---------------------------------+  Port : 27017  
 |   MONGODB DATABASE       |  Pcol : mongodb://  
 +------------+-------------------+  
&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;^  
&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; |  
&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; |  
  +-----------------------------------+  
  | &ensp; &ensp;&ensp;&ensp;&ensp;&ensp; |&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; &ensp; &ensp; &ensp; |  
  | +---------+---------------------+ |  
  | | Database abstraction| |  
  | |      layer &ensp;&ensp;&ensp; &ensp; &ensp;&ensp;&ensp;&ensp; &ensp; &ensp;&ensp;&ensp;| |  
  | +-----------^-------------------+ |  
  | &ensp;&ensp;&ensp; &ensp; &ensp; &ensp;|   &ensp;&ensp;&ensp; &ensp; &ensp;&ensp;&ensp;&ensp; &ensp; &ensp;          |  
  | +----------+--------------------+  |  
  | |      Models(users) |  |  
  | +---------^----------+  |  
  |&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;| &ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;|  
  |&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;| &ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;|  
  |&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;+ &ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;| Port : 11100  
  |    Database-router      | Pcol : http  
  +-----------^-------------+  
&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; |  
  +-----------+----------+  
  |    Users controllers |     Port : 11110  
  |                      |     Pcol : http  
  +-----------^----------+  
 &ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;|  
+-------------+------------+  
|  GATEWAY (API using HAPI)|    Port : 80  
+--------------------------+    Pcol : http  
## To list 

[X] Abstraction layer to connect to mongodb
[] Handle sharded Cluster (replica set + cluster)
[] Set Mongos
[] Set load balancer to decide which mongo use
[X] Users microservices
[X] Seneca plugin
[X] HAPI Api