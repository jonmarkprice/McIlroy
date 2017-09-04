# McIlroy
A postfix, point-free, purely functional program-builder named after Douglas McIlroy, inventor of the Unix pipeline, which the programs resemble.

## Run Program Builder
After cloning or downloading
```sh
$ cd McIlroy
$ npm install
$ npm start # will start on localhost:3000
```

## Run Parser
```sh
cd McIlroy
node src/parser.js "<input list>" "<program>"
```
### Example Programs
Try some of these programs!

Description                | Input            | Program            
---------------------------|------------------|--------------------
Sum.                       |`"42, 3, 1"`      |`"+ 0 reduce :"`   
Construct a list.          |`""`              |`"[] T cons : F cons :"`
All function.              |`"T, T, F"`       |`"and T reduce :"`
String to uppercase.       |`"'h', 'i'"`      |`"capitalize map :"`
Sum of squares.            |`"1, 2, 3, 4"`    |`"2 ^ flip : partial : map : sum :"`
Average.                   |`"15, 21, 9"`     |`"[] sum cons : length cons : into : / apply :"`
Capitalize first letter.   |`"'b', 'y', 'e'"` |`"split : [] capitalize cons : id cons : zip : eval map : concat [] reduce :"`
