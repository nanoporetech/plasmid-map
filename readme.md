
# Plasmid visualisation

We have recreated the VIXIS plasmid map (http://angularplasmid.vixis.com/) as a reusable web component for all modern web frameworks.

![Plasmid DEMO](https://raw.githubusercontent.com/nanoporetech/plasmid-map/master/demo.png)

## Using this component

There are three strategies we recommend for using the `@metrichor/plasmid` web component built with Stencil.

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/@metrichor/plasmid@0.1.0/dist/plasmid/plasmid.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install @metrichor/plasmid --save`
- Put a script tag similar to this `<script src='node_modules/@metrichor/plasmid/dist/plasmid/plasmid.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install @metrichor/plasmid --save`
- Add an import to the npm packages `import @metrichor/plasmid;`
- Then you can use the element anywhere in your template, JSX, html etc


## Visualising Plasmid data

To use the Plasmid map visualisation in your HTML you will need to create a [plasmid-map](./src/components/plasmid-map/readme.md) tag and appropriate nested tags

See [examples](examples/all.html)
