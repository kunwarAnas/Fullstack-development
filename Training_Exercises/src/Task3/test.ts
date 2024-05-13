import { migrateData } from './script';
import { Request, Response } from 'express';
import fs from 'fs';

jest.mock('fs');

describe('migrateData function', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful migration', async () => {
    // Mock the behavior of fs.createReadStream and csv parser
    const mockStream = fs.createReadStream(__dirname + '/data.csv', 'utf-8')
    console.log(mockStream)
    const mockCsvStream = mockStream?.pipe(jest.fn() as any);

    // Provide mock implementation for fs.createReadStream and csv parser
    //jest.spyOn(fs, 'createReadStream').mockReturnValue(mockStream);
    ///jest.spyOn(mockStream, 'pipe').mockReturnValue(mockCsvStream);

    // Simulate successful migration
    await migrateData(req, res);

    // Assert that the function sends the correct response
    expect(res.status).toHaveBeenCalledWith(expect.any(Number));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      created: expect.any(Number),
      skipped: expect.any(Number),
      updated: expect.any(Number),
    }));
  });

  // Add more test cases for other scenarios
});
