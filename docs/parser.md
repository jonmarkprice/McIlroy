# Functions 

TODO:
Decide - do I want to make both stack and program: [Literal]
or should stack be something else?

## Parse
`parse :: [Literal] -> Either [Step] Error`
Takes a list of Literals, returns a list of Steps or an Error

## parseProgram (not a good name)
`parseProgram :: [Literal] -> [Literal] -> bool -> number -> Aggregate `
Takes two list of Literals, a bool, and anumber (for tracking index) 
and returns an Aggregate containing {
  steps: Either [Step] Error
  stack: [Literal] (?)
  first: bool
  index: number
}.


## execToken
Parses a token
syntax -> _
list   -> _
fn / token -> _

## parseFunction

## exec ==> execFunction
Ideal
[Literal] -> Either (Step, [Literal]) Error
(a -> b) -> [Literal] -> (Step, [Literal]) Error

Current
func, stack, index -> 


----------------------------------
# Old parser

map (input) -> tokens
reduce (tokens) -> Steps

