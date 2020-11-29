const themes = require("../../themes/themes");
const animations = require("../../animations/animation");
const layouts=require("../../layouts/layout");
const quoteService=require("../services/quotesService");

const quoteController = async (req, res, next) => {
  
  try {
     let theme = themes[req.query.theme] ? themes[req.query.theme] : themes["default"];

     let animation = animations[req.query.animation] ? animations[req.query.animation] 
                    : animations["default"];
    
     let layout=layouts[req.query.layout] ? layouts[req.query.layout] 
                    : layouts["default"];

     let quoteObject={theme,animation,layout}

     let svgResponse = await quoteService.getQuote(quoteObject);

     res.setHeader("Content-Type", "image/svg+xml");
        
     res.header(
        "Cache-Control",
        "no-cache,max-age=0,no-store,s-maxage=0,proxy-revalidate"
        );
     res.header("Pragma", "no-cache");
     res.header("Expires", "-1");
     res.send(svgResponse);

  } catch (error) {
    
    res.send({
      name: error.name,
      message: error.message,
    });
  
  }
};

module.exports = {
  quoteController
};
