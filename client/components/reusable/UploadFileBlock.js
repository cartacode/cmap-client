import PropTypes from 'prop-types';
import React from 'react';

/**
 * This is common reusable component for "Upload Imagery & Datasheets" section.
 */
class UploadFileBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }

    renderFields() {
        return this.props.fields.map((item, i) => {
            let input;
            let value = '';
            if (item.valFieldID !== undefined && this.state.content[item.valFieldID] !== undefined && this.state.content[item.valFieldID] !== null) {
                value = this.state.content[item.valFieldID];
            }
            switch (item.fileType) {
                case 'image':
                    if (item.required) {
                        input = (<input type="file" className="hidden_input pull-right" value={value} name={item.valFieldID} accept="image/*" required />);
                    }
                    else {
                        input = (<input type="file" className="hidden_input pull-right" value={value} name={item.valFieldID} accept="image/*" />);
                    }
                    break;
                case 'file':
                    if (item.required) {
                        input = (<input type="file" className="hidden_input pull-right" value={value} name={item.valFieldID} required />);
                    }
                    else {
                        input = (<input type="file" className="hidden_input pull-right" value={value} name={item.valFieldID} />);
                    }
                    break;
            }

            return (
                 <div className="upload-line">
                        <div>
                            {item.name}
                        </div>
                        {input}
                </div>

            );
        });
    }

    render() {
        return (
            <div className="col-md-4 upload-block">
                <div className="upload-imagery">
                    <img src={this.props.headerLine} alt="" />
                    <div className="header-text">
                        {this.props.title}
                  </div>
                    <img className="mirrored-X-image" src={this.props.headerLine} alt="" />
                </div>
                <div className="upload-content">
                    {this.renderFields()}
                </div>
            </div>
        );
    }
}


UploadFileBlock.propTypes = {
    children: PropTypes.element,
    

};

export default UploadFileBlock;
