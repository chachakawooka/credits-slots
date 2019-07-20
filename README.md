# About this game

Credits slots works on the Credits (CS) blockchain.

## Play Now

A fully working version of Credits Slots in available here. [Play Now][1]

## Features

* Default Credits Slot
* Bet Changing
* Balance view
* Last win view
* Dynamic Pay Tables
    * 2 Tiers of prizes
    * Progressive Jackpot
* Make Your Own Slot
    * Configurable number of reels
    * Configurable Symbols
    * Slot maker recieves portion of Progressive Jackpot
    * Dynamically produced pay table reflective of chances
* No need Cesar for browser extensions
* Serverless (can be ran offline)
* Can change the node end point

## Make Your Own Slot

Once logged in each user can create their own slot for the price of 1CS

Any images can be referenced and used as symbols as long as its hosted on a secure domain.

The Pay Table will automatically modify itself to be reflective of the number of variations created based on Math.pow(numSymbols, numReels)

## About the Progressive Jackpot

The progressive Jackpot is 10% of the contract Balance of (balance-10000).  Whichever is larger

The progressive Jackpot chance is curved so the chance of winning it becomes more likely the closer to 10000 the jackpot gets.

The progressive jackpot pays out:
* 90% of the jackpot to the player
* 10% of the jackpot to the creator of the slot

[1]: https://chachakawooka.github.io/credits-slots/ "Credits Slot"