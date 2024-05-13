import { createCopy, createWriteFile, readFile } from "./readFile";
import fs from "fs";

jest.mock("fs");

let req: any, res: any;

const mockFileData = "Mock file data";

describe("readFile", () => {
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return status 200 with file data if file exists", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileData);

    readFile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Data from file",
      data: mockFileData,
    });
  });
});

describe("createWriteFile", () => {
  beforeEach(() => {
    req = {
      body: { data: "Test file data" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return status 200 with success message and data if file is created successfully", () => {
    const mockWriteFileCallback = jest.fn();
    (fs.writeFile as unknown as jest.Mock ).mockImplementation((path, data, callback) => {
      callback(null); // Simulate successful write
    });

    createWriteFile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "file create success",
      data: undefined, // Mocked fs.writeFile does not return data
    });
  });
});


describe("createCopy", () => {
    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    it("should return status 200 with file data copied", () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileData);
      (fs.appendFile as unknown as jest.Mock).mockImplementation((path, data, callback) => {
        callback(null); // Simulate successful append
      });;
  
      createCopy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "file backup success",
      });
    });
  });