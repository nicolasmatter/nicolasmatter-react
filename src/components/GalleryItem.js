import React from "react";
import { urlFor } from "./GalleryContainer";

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
        <div
          className={
            "gallery-item " + this.props.showHideGalleryItem(data.projectID)
          }
          id={"gallery-item-" + data.projectID}
        >
          <button
            onClick={() => this.props.setProject(data)}
            className="gallery-item-button"
          >
            <div
              className="gallery-item-text"
              style={{
                backgroundImage: `url(${urlFor(data.backgroundImage)})`,
              }}
            >
              <span>{data.name}</span>
            </div>
          </button>
          <div className="gallery-item-infos">
            <div className="gallery-item-headline">{data.headline}</div>
            <div className="tags-container">
              {data.tags.map((tag) => {
                let noSpaceTag = tag.replace(/\s/g, "");
                return (
                  <>
                    <TagButton
                      key={data.projectID + " " + tag}
                      tag={tag}
                      setfilter={() => this.props.setFilter(noSpaceTag)}
                      classString={[
                        data.projectID +
                          " " +
                          noSpaceTag +
                          " tag-button gallery-item-tag " +
                          this.props.checkFilter(noSpaceTag),
                      ]}
                    ></TagButton>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const TagButton = (props) => {
  return (
    <button onClick={props.setfilter} className={props.classString}>
      {props.tag}
    </button>
  );
};
