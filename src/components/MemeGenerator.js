import React from 'react';

// https://api.imgflip.com/get_memes

class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			topColor: 'white',
			bottomColor: 'white',
			randomImg: 'https://i.imgflip.com/59qi.jpg',
			allImgs: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json())
			.then(response => {
				const { memes } = response.data;
				this.setState({
					allImgs: memes
				});
			});
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let randomNumber = Math.floor(
			Math.random() * this.state.allImgs.length
		);
		this.setState({
			randomImg: this.state.allImgs[randomNumber].url
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className='inputDiv'>
						<div className='inputBlocks'>
							<input
								type='text'
								name='topText'
								value={this.state.topText}
								placeholder='Top Text'
								onChange={this.handleChange}
							/>
							<input
								type='text'
								name='topColor'
								placeholder='Top Text Color'
								onChange={this.handleChange}
							/>
						</div>
						<br />
						<div className='inputBlocks'>
							<input
								type='text'
								name='bottomText'
								placeholder='Bottom Text'
								onChange={this.handleChange}
							/>
							<input
								type='text'
								name='bottomColor'
								placeholder='Bottom Text Color'
								onChange={this.handleChange}
							/>
						</div>
					</div>

					<button>Generate Meme</button>
					<div className='meme'>
						<img
							src={this.state.randomImg}
							alt='Nothing right now'
						/>
						<h2
							className='top'
							style={{ color: this.state.topColor }}
						>
							{this.state.topText}
						</h2>
						<h2
							className='bottom'
							style={{ color: this.state.bottomColor }}
						>
							{this.state.bottomText}
						</h2>
					</div>
				</form>
			</div>
		);
	}
}

export default MemeGenerator;
