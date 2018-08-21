import PropTypes from 'prop-types';
import React from 'react';

/**
 * This is common reusable component for "Upload Imagery & Datasheets" section.
 */
class UploadFileBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            previewFile: {
                name: '',
                originalFile: null
            },
        },
            this.handleSelectedFile = this.handleSelectedFile.bind(this);
    }


    componentWillMount() {
        this.setState({
            content: this.props.initstate,
        });
    }

    /**
     * This method is use for handle the selected file by browse.
     */
    handleSelectedFile = (event) => {
        const name = event.target.name;
        const id = event.target.id;
        const file = event.target.files[0];
        if(file.size > 1024000){
            alert("File size should be less than 1 MB.");
            document.getElementById(id).value= null;
            if(this.props.isImagedRequired){
                this.updateContent(name, new File([""], ""));
            }
         }else {
            this.updateContent(name, file);
         };
    }

    /**
     * This method is use for update the content state.
     * @param {*} name 
     * @param {*} file 
     */
    updateContent(name, file) {
        const { content } = this.state;
        const { previewFile } = this.state;
        this.setState({
            content: {
                ...content,
                [name]: file,
            },
            previewFile: {
                ...previewFile,
                name: name,
                originalFile: file
            }
        }, () => {
            this.props.data(this.state.content);
            this.props.previewFile(this.state.previewFile);
        });
    }

    renderFields() {
        const isEditRecord = this.props.isImagedRequired;
        return this.props.fields.map((item, i) => {
            let input;
            switch (item.fileType) {
                case 'image':
                        input = (<input type="file" id={`uploadFile_${i}`} className="hidden_input pull-right" name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} accept="image/*" />);
                    break;
                case 'file':
                        input = (<input type="file" id={`uploadFile${i}`} className="hidden_input pull-right"  name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)}  />);
                    break;
            }
            return (
                <div className="upload-line" key={'elem' + i}>
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