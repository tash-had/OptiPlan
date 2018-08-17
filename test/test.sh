# if no args are provided, run ui test. if args are provided, open cypress 

if [ $# -eq 0 ]
  then
    node_modules/.bin/cypress run
    exit 1
fi
node_modules/.bin/cypress open
