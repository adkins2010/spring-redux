class SpaceComponent {
    constructor(space, store, document, index = -1) {
        this.space = space;
        this.store = store;
        this.document = document;
        let spaceMarkup = document.createElement('li');
        let firstLabel = spaceMarkup.createElement('label');
        firstLabel.innerHTML = "Name&nbsp;";
        let firstInput = spaceMarkup.createElement('input');
        firstInput.setAttribute('id', 'name_' + index);
        spaceMarkup.appendChild(firstLabel);
        spaceMarkup.appendChild(firstInput);

        let secondLabel = spaceMarkup.createElement('label');
        secondLabel.innerHTML = "Memory&nbsp;";
        let secondInput = spaceMarkup.createElement('input');
        secondInput.setAttribute('id', 'memory_' + index);
        spaceMarkup.appendChild(secondLabel);
        spaceMarkup.appendChild(secondInput);
        console.log(spaceMarkup);

        let thirdLabel = spaceMarkup.createElement('label');
        thirdLabel.innerHTML = "Disk&nbsp;";
        let thirdInput = spaceMarkup.createElement('input');
        thirdInput.setAttribute('id', 'disk_' + index);
        spaceMarkup.appendChild(thirdLabel);
        spaceMarkup.appendChild(thirdInput);

        spaceMarkup.innerHTML += '<button name="add">+</button><button name="edit">*</button><button name="delete">-</button>';


        //<label>Name</label>&nbsp;<input name="name"><br>
    // <label>Memory</label>&nbsp;<input name="memory"><br/>
    //         <label>Disk</label>&nbsp;<input name="disk">

        this.appsList = [];
    }
}
export default SpaceComponent