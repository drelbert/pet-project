https://btholt.github.io/complete-intro-to-react-v5/


# to run the project
  npm run dev

create the project with
npm init -y (for no questions)

prettier
all about the formating
npm i -D prettier
standardizes the format

        add to scripts in package.json

        then use command
            npm run format

eslint
all about style and methods

    to check it
        npm run lint

    have: eslintrc.json
        file rules, extends, etc

parcel
bundler

    very hands off
    easy to set up
        less complex than WebPack

        npm install -D parcel-bundler
        but used
        npm i parcel
            instead given an error using the previous



adding plugins:
configuring eslint for react
use

npm install -D babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
updated the eslint.json file with these plugins

to allow eslint to understand react

allows: eslint to be augmented by babel

updated eslint.json with
npm i -D eslint-plugin-react-hooks

defines (from React team) how to write hooks
