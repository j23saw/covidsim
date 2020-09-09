import React, {Component} from 'react'
import p5 from "p5"
import sketch from './sketch'

export default class P5Wrapper extends Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        this.myP5 = new p5(sketch, this.myRef.current)
        this.myP5.props = this.props.p5Props
    }

    shouldComponentUpdate(nextProps) {
        this.myP5.props = nextProps.p5Props
        return false
    }

    componentWillUnmount() {
        this.myP5.remove()
    }

    render() {
        return (
            <>
                <div
                    ref = {this.myRef}
                />
            </>
        )
    }
}