#!/bin/bash

/geth account new --datadir ./datablock              # Cоздание аккаунта

/geth -datadir ./.datablock init ./genesis.json      # Создание первичного блока

/geth --rpc --networkid 1999 --datadir ./datablock

/geth --mine --minerthreads=2 --rpc --networkid 1999 --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi db,eth,net,web3,personal,parity,miner  --datadir ./datablock

/geth --rpc --networkid 1999 --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi db,eth,net,web3,personal,parity,miner 

geth --etherbase 0 --mine  #первый аккаунт майнит

geth --etherbase '6a7d06cdc60a8a633a3a14e29ce2ae8e8710afc1' --mine 2>> mine.log

#personal.unlockAccount(eth.accounts[0],"lizalovesyou")

0x61ffcac0d5b036abe096a1b7a2317ddf318a03a1
RUN /geth account new <pass.txt >out.txt
/geth account new --datadir ./.datablock <pass.txt >out.txt

RUN /geth account new <pass.txt | out.txt
ADD ./datadir /root/.ethereum

cp -R .ethereum /usr/src/app/datadir/datablock

