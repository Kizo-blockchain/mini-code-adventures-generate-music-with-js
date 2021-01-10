const svgRenderer = require('./scripts/svg_renderer.js').default;

exports.getSVG = function(req, res) {
    const svg = svgRenderer(req.query);
    res.send(svg);
}