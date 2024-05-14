function compileFührerMark(code) {
    const propPattern = /([\w-]+)\s*:\s*([^;\n]+),?/g;
    let htmlCode = "";
    let cssCode = "";
    let currentStyle = "";
  
    code.trim().split(/\n\s*\n/).forEach(element => {
      let [elementName, propertiesStr] = element.split('{', 2);
      propertiesStr = propertiesStr.trim().replace(/}\s*$/, '');
      let props = [...propertiesStr.matchAll(propPattern)].reduce((acc, [, name, value]) => {
        name = name.trim();
        value = value.trim();
        if (name === 'size') value += 'px';
        if (name === 'text') {
          acc.text += `<a style="${currentStyle}">${value}</a>`;
          if (value.includes('=>')) {
            const [textValue, href] = value.split('=>');
            acc.text = acc.text.replace(value, `${textValue}<a href="${href.trim()}">`);
          }
        } else if (name === 'music') acc.music = value;
        else if (name === 'autoplay') acc.autoplay = value;
        else {
          cssCode += `${elementName} { ${name}: ${value} }\n`;
          currentStyle += `${name}: ${value};`;
        }
        return acc;
      }, { text: "" });
  
      if (props.text) htmlCode += props.text + "\n";
      if (props.music) htmlCode += `<audio src="${props.music}" controls${props.autoplay ? ` autoplay="${props.autoplay}"` : ''}></audio>\n`;
    });
  
    return { htmlCode: `<title>${code.split('{')[0].trim()}</title>\n<body>\n${htmlCode}</body>`, cssCode };
  }
  
  module.exports = { compileFührerMark };  