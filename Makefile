dev:
	npx parcel src/index.html

build:
	rm -r dist
	npx parcel build src/index.html

# abuse of git but whatever i just want github pages
# unstaged changes on master will be lost
deploy: build
	git checkout --orphan gh-pages
	git --work-tree dist add --all
	git --work-tree dist commit -m gh-pages
	git push origin HEAD:gh-pages --force
	rm -r dist
	git checkout -f master
	git branch -D gh-pages
