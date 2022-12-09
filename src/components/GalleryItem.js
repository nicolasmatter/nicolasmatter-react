import React from "react";
import { urlFor } from "./Gallery";

export class GalleryItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
		};
	}
	render() {
		let data = this.state.data;

		return (
			<>
				<div className="gallery-item">
					<button onClick={() => this.props.setProject(data)} className="gallery-item-button">
						<div className="gallery-item-text" style={{ backgroundImage: `url(${urlFor(data.backgroundImage)})` }}>
							<span>{data.name}</span>
						</div>
					</button>
					<div className="gallery-item-infos">
						<div className="gallery-item-headline">{data.headline}</div>
						<div className="tags-container">
							{data.tags.map((tag) => {
								return (
									<>
										<button
											onClick={() => this.props.setFilter(tag.replace(/\s/g, ""))}
											className={[
												tag.replace(/\s/g, "") +
													" tag-button gallery-item-tag " +
													this.props.checkFilter(tag.replace(/\s/g, "")),
											]}
										>
											{tag}
										</button>
									</>
								);
							})}
						</div>
					</div>
				</div>
				<hr></hr>
			</>
		);
	}
}
