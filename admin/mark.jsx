import React from 'react'
import marked from 'marked'

export class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value:
        '# hello, This is Markdown Live Preview\n\n----\n## what is Markdown?\nsee [Wikipedia](http://en.wikipedia.org/wiki/Markdown)',
    };

    this.handleChange = this.handleChange.bind(this);
    this.createMarkdownPreview = this.createMarkdownPreview.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  createMarkdownPreview() {
    return { __html: marked(this.state.value) };
  }
  render() {
    return (
      <div>
        <h1 id="markdown-title">{this.props.name}</h1>
        <div id="markdown-content">
          <div id="markdown-src">
            <div>Src:</div>
            <textarea type="text" onChange={this.handleChange} value={this.state.value}></textarea>
          </div>

          <div>Pre:</div>
          <div id="markdown-des">
            <div dangerouslySetInnerHTML={this.createMarkdownPreview()}></div>
          </div>
          <div className="clear-all"></div>
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<MarkdownPreview name="Markdown Preview" />, document.getElementById('app'));
