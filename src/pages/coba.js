import { useState, useEffect } from "react"

function Coba() {
    const [fruit, setFruit] = useState([
        { id: 1, value: "banana", isChecked: false },
        { id: 2, value: "apple", isChecked: false },
        { id: 3, value: "mango", isChecked: false },
        { id: 4, value: "grap", isChecked: false }
    ])
    const [sfruit, setSfruit] = useState([])
    var handleAllChecked = null
    const handleCheckChieldElement = (event) => {
        var fruites = fruit
        fruites.forEach(fruite => {
            if (fruite.value === event.target.value)
                fruite.isChecked = event.target.checked
        })
        setFruit(fruites)
    }
    const changee = (id) => {
        const f = fruit
        const findIdx = f.indexOf(id)
        if (findIdx > -1) {
            f.splice(findIdx, 1);
        } else {
            f.push(id);
        }
        setFruit(f)
    }
    // useEffect(() => {
    //     handleAllChecked = (event) => {
    //         const fruites = fruit
    //         fruites.forEach(fruite => fruite.isChecked = event.target.checked)
    //         setFruit(fruites)
    //         console.log("click: " + fruit[3].isChecked)
    //     }
    // })
    return (
        <div className="appp">
            <h1> Check and Uncheck All Example </h1>
            <input type="checkbox" value="checkedall" onClick={handleAllChecked} /> Check / Uncheck All
            <ul>
                {/* {
                    fruit.map((doc, idx) => {
                        return (
                            <li>
                                <input key={doc.id} onClick={handleCheckChieldElement} type="checkbox" defaultChecked={doc.isChecked} value={doc.value} /> {doc.value}
                            </li>
                        )
                    })
                } */}
                {
                    fruit.map((doc, idx) => {
                        return (
                            <li>
                                <input type="checkbox" onChange={() => changee(doc.id)} /*checked={sfruit.includes(doc.id)}*/ />
                            </li>
                        )
                    })
                }
            </ul>
            <p>Selected checkboxes: {JSON.stringify(fruit)}</p>
        </div>
    )
}

export default Coba