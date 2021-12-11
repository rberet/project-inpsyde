/**
 * BLOCK: inpsyde-gutenberg
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
import { useBlockProps, MediaUpload, InnerBlocks } from '@wordpress/block-editor';
import React, { useState } from "react";

/**
 * Internal block libraries
 */

 const { Fragment } = wp.element;
 const {
	 registerBlockType,
 } = wp.blocks;
 const {
	 InspectorControls,
	 RichText,
 } = wp.editor;
 const {
	  Toolbar,
	 Button,
	 Tooltip,
	 PanelBody,
	 PanelRow,
	 FormToggle,
	 TextControl,
	 IconButton,
	 RangeControl,
 } = wp.components;


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-inpsyde-gutenberg', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'inpsyde-gutenberg - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'inpsyde-gutenberg — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
    attributes: {
		 button: {
			type: 'string',
			source: 'text',
			selector: '.modal-button-text',
		 },
		 slug: {
			type: 'string',
		 },
        firstName: {
            type: 'string',
            source: 'html',
            selector: '.firstName'
        },
        lastName: {
            type: 'string',
            source: 'text',
            selector: '.lastName'
        },
        position: {
            enum: ['CEO', 'Developer', 'Project Manager'],
            source: 'text',
            selector: '.position'
        },
        description: {
            type: 'string',
            source: 'text',
            selector: '.description'
        },
        gitHub: {
            type: 'string',
            source: 'text',
            selector: '.gitHub',
            attribute: 'src'
        },
        linkedIn: {
            type: 'string',
            source: 'text',
            selector: '.linkedIn',
            attribute: 'src'
        },
        xing: {
            type: 'string',
            source: 'text',
            selector: '.xing',
            attribute: 'src'
        },
        facebook: {
            type: 'string',
            source: 'text',
            selector: '.facebook',
            attribute: 'src'
        },
        image: {
            type: 'object',
            selector: 'staff-image'
          },
		  mediaURL: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src',
        }

    },
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-inpsyde-gutenberg'></p>.
		const {
			button,
			slug,
			firstName,
			 lastName,
			 position,
			 description,
			 gitHub,
			 linkedIn,
			 xing,
			facebook,
		} = props.attributes;
	
		const attributes = props.attributes;
		const setAttributes = props.setAttributes;
		const { MediaUpload, MediaUploadCheck, RichText } = wp.blockEditor;
		function slugify(text) {
			if( !text ) { return ''; }
			   return text.toString().toLowerCase()
				.replace(/\s+/g, '-')           // Replace spaces with -
				.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
				.replace(/\-\-+/g, '-')         // Replace multiple - with single -
				.replace(/^-+/, '')             // Trim - from start of text
				.replace(/-+$/, '');            // Trim - from end of text
			 }

		// function createSlug(text) {
		//      return Math.random().toString().replace('0.', '');
		// }

		//
		//const onChangeSlug = slug => { setAttributes( { slug : getRandomInt(1, 1000000) } ) };
		//const onChangeSlug = slug => { setAttributes( { slug : 'TEST' } ) };
		const onChangeSlug = slug => { setAttributes( { slug : slugify(firstName) } ) };

		onChangeSlug();
	
		const handleChange = (e) => {
			//        if(e.target.name === "")return;
					setAttributes({ 
						...attributes,
						[e.target.name]: e.target.value
					});
				}
				const clearFields = () => {
					//        e.target.value="";
							const attributeCopy = {...attributes}
							let items;
							for(items in attributeCopy){
								attributeCopy[items]=""
							}
							setAttributes(attributeCopy)
					//        setAttributes(attributeCopy)
						}
						const { image } = attributes
	
		return (
			<div{...useBlockProps()}>
	
						 <div className="block__container">
							 <h2 className="firstClass">Employee Details</h2>
							 {/*name
							 <img src={} alt="staff image"/>
	 
							 */}
							 <div className="about">
								 <div className="employee-name">
									 <input type="text" 
										 name="firstName" 
										 placeholder="Firstname"
										 value={attributes.firstName || ""}
										 onChange={handleChange}
										 required
									 />
									 <input type="text" 
										 name="lastName" 
										 value={attributes.lastName || ""}
										 placeholder="LastName"
										 onChange={handleChange}
										 required
									 />
								 </div>
								 <div className="staff-image">
			<MediaUploadCheck>
			  <MediaUpload
				className="staff-image"
				allowedTypes={['image']}
				multiple={false}
				value={image ? image.id : ''}
				onSelect={image => setAttributes({ image: image })}
				render={({ open }) => (
				  image ?
					<div>
					  <p>
						<img src={image.url} width={image.width / 2} />
					  </p>
	
					  <p>
						<Button onClick={() => setAttributes({ image: '' })} className="button is-small">Remove</Button>
					  </p>
					</div> :
					<Button onClick={open} className="button">Upload Image</Button>
				)}
			  />
			</MediaUploadCheck>
	
			…
		  </div>
							 </div>
	 
								 <label htmlFor="description"></label>
								 <textarea rows="5" cols="30"
									name="description"
									 className="description"
									 value={attributes.description || ""} 
									 placeholder="Empolyee description:"
									 onChange={ handleChange }
									 required
								 >
								 </textarea>
	 
								 <div className="socials">
									 <label htmlFor="gitHub">
										 <input type="text" 
											 name="gitHub"
											 value={attributes.gitHub || ""} 
											 placeholder="GitHub" 
											 onChange={handleChange}
										 />
									 </label>
									 <label htmlFor="linkedIn">
										 <input type="text" 
											 name="linkedIn" 
											 value={attributes.linkedIn || ""} 
											 placeholder="LinkedIn" 
											 onChange={handleChange}
										 />
									 </label>
									 <label htmlFor="xing">
										 <input type="text" 
											 name="xing"
											 value={attributes.xing || ""}  
											 placeholder="Xing" 
											 onChange={handleChange}
										 />
									 </label>
									 <label htmlFor="facebook">
										 <input type="text" 
											 name="facebook" 
											 value={attributes.facebook || ""} 
											 placeholder="Facebook" 
											 onChange={handleChange}
										 />
									 </label>
								 </div>
								 <button type="button" onClick={clearFields} className="btn">Clear fields</button>
						 </div>
					 </div>
		 );
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	
	save: ( props ) => {
		const {
			button,
			slug,
			firstName,
			 lastName,
			 position,
			 description,
			 gitHub,
			 linkedIn,
			 xing,
			facebook,
			mediaURL,
		} = props.attributes;
	
		const attributes = props.attributes;
		const setAttributes = props.setAttributes;
		let buttonText = button;
		if( (button === '') || (button === null) ) { buttonText = firstName; }

		let slugOutput = '#' + slug;
		return (
			<div className="modal-area" {...useBlockProps.save()}>

				<a href={slugOutput} data-toggle="modal"><RichText.Content tagName="img" className="staff-image"  src={attributes.image.url} width={attributes.image.width / 2} /></a>
				<a href={slugOutput} data-toggle="modal"><RichText.Content tagName="h2" className="firstName" value={attributes.firstName} /></a>
				<a href={slugOutput} data-toggle="modal"><RichText.Content tagName="h2" className="lastName" value={attributes.lastName} /></a>
				<a href={slugOutput} data-toggle="modal"><RichText.Content tagName="h5" className="position" value={attributes.position} /></a>


				<div className="clb-custom-modal-move">
				<div id={slug} className="modal fade" tabindex="-1" role="dialog">
						<div className="modal-dialog" role="document">
                             <div className="modal-content">	
							 <div className="modal-body">
							<RichText.Content tagName="h2" className="firstName" value={attributes.firstName} />
							<RichText.Content tagName="h2" className="lastName" value={attributes.lastName} />		
							<RichText.Content tagName="h6" className="description" value={attributes.description} />
							<RichText.Content tagName="p" className="gitHub" value={attributes.gitHub} />
							<RichText.Content tagName="p" className="linkedIn" value={attributes.linkedIn} />
							<span class="iconify" data-icon="dashicons:facebook-alt"></span>
							<RichText.Content tagName="p" className="facebook" value={attributes.facebook} />
							<RichText.Content tagName="p" className="xing" value={attributes.xing} />
							</div>
							 </div>	
						</div>	
					</div>	
				</div>
			</div>
		);
	},
} );
