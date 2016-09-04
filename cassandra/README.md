#Cassandra SETUP

install:
cassandra-driver https://github.com/datastax/python-driver

reminder: python 2.7.12 does not work.


Make sure create a table before running the kafka and cassandra python code.
~~~~
CREATE KEYSPACE "stock" WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1} AND durable_writes = 'true';
USE stock;
CREATE TABLE stock (stock_symbol text, trade_time timestamp, trade_price float, PRIMARY KEY (stock_symbol,trade_time));
~~~~

~~~~
python data-storage.py stock-analyzer 192.168.99.100:9092 stock stock 192.168.99.100
~~~~
