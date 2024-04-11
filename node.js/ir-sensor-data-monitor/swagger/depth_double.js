module.exports = {
  "/v1/kw-sensors/{sid}": {
    get: {
      operationId: "receiveUserData",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          name: "sid",
          in: "path",
          description: "SensorID",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Data received successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "integer",
                  },
                  message: {
                    type: "string",
                    example: "정상",
                  },
                  data: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
        206: {
          description: "Invalid request payload",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "001",
                  },
                  message: {
                    type: "string",
                    example: "데이터를 찾을 수 없습니다.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid request payload",
        },
        404: {
          description: "API not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "002",
                  },
                  message: {
                    type: "string",
                    example: "API를 찾을 수 없습니다.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
