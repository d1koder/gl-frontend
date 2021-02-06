import React, { Component } from 'react'

export default class Test extends Component {

    state = {
        title: '',
        description: '',
        featured_image: null,
        category_id: 1,
        rate: 0.0
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onImageChange = event => {
        this.setState({ featured_image: event.target.files[0] });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('featured_image', this.state.featured_image);
        formData.append('category_id', this.state.category_id)
        formData.append('rate', this.state.rate)

        await fetch('http://localhost:3000/api/properties', {
            method: 'POST',
            body: formData
        })
            .catch(error => console.log(error))

        const response = await fetch('http://localhost:3000/api/properties')
        const data = await response.json();
        console.log(data);

        this.input1.value = ''
        this.input2.value = ''
        this.input3.value = 1
        this.input4.value = 0.0
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" placeholder="please type in the title" ref={currNode => this.input1 = currNode} onChange={this.handleChange} />
                    <input type="text" name="description" placeholder="please type in the description" ref={currNode => this.input2 = currNode} onChange={this.handleChange} />

                    <select name="category_id" ref={currNode => this.input3 = currNode} onChange={this.handleChange}>
                        <option value={1}>Birthday</option>
                        <option value={2}>Corporate</option>
                        <option value={3}>Wedding</option>
                    </select>

                    <input type="text" name="rate" placeholder="please set the rate" ref={currNode => this.input4 = currNode} onChange={this.handleChange} />

                    <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
                    <button>press me</button>
                </form>
            </>
        )
    }
}
