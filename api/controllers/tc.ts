import {TestClass} from "../services/test-service"
import { Request, Response } from "express";


class testController {
    testFunction (req: Request, res: Response){ 
        let myObj = new TestClass();
        res.send("HEY THERE");
    }
}
export function testFunc(req, res) {
    let myObj = new TestClass();
    res.send(myObj.myFunc("yo FAM HEY THERE 2"));
}
export {testController};