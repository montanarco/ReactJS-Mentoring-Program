import React from "react";

export default function ApplyComposition() {
    return (
        <div>
            <p>Having implemented above components, now you can compose them to implement the following use cases. Write new Storybook stories to showcase them.

                <ul>
                    <li>* Add movie. Render Dialog and put a MovieForm inside without passing initial movie info. This should render a dialog with the empty movie form.</li>
                    <li>* Edit movie. Render Dialog and put a MovieForm inside, pass some dumb data for initial movie info. This should render a dialog with prefilled form fields.</li>
                    <li>* Delete movie. Render Dialog with content from "delete movie" modal from</li>
                </ul>
                <a href="https://learn.epam.com/myLearning/path?moduleId=20223056&rootId=19613093"> epam learn link</a>
            </p>
        </div>
    )
}