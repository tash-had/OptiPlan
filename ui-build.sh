#!/usr/bin/env bash
build_file="ui-build/"
root=`pwd`
log="LOG:"

echo "$log STARTING BUILD"
# remove old ui-build 
rm -rf $build_file
cp -r ui/ $build_file

cd $build_file
current_path=`pwd`

mv "$current_path/.index.html" "$current_path/index.html"
rm "$current_path/index.js"
rm "$current_path/nodeman-ui-config.json"

echo "{\"compilerOptions\": {\"target\": \"es5\",\"types\": [], \"noEmitOnError\": false}}" > "tsconfig.json"

# if there are typescript fies, compile to .js and delete the .ts
count=`find . -name '*.ts' | wc -l`
if [ $count != 0 ]
then
echo "$log COMPILING TYPESCRIPT" 
tsc
echo "$log TYPESCRIPT COMPILED"
for i in `find . -regex ".*\.ts"`
do
rm $i
done
rm "$current_path/tsconfig.json"
fi 
cd $root
echo "$log COMPLETED BUILD"