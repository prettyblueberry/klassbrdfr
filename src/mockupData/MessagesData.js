import * as moment from 'moment';
import {uniqueId} from "utils";

export default {
  haveMessages: true,
  smsCredits: 536,
  smsStatistic: {
    //???
    smsMessages: 3,
    smsSent:  282,
    smsOpened: 266,
    smsOpenedOf: 69,
  },
  multimediaStatistic: {
    multimediaMessages: 7,
    view: 626,
    viewOf: 83,
    signature: 626,
    signatureOf: 83,
    comments: 627,
    commentsOf: 83,
    reactions: 524,
    reactionsOf: 48,
  },
  all: [
    //page 1
    {
      page: 0,
      messages: [
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 1",
          created: moment().unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        // event
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {
                id: uniqueId(),
                type: "event",
                data:{
                  description: "adwdawd",
                  from: moment().unix(),
                  to: moment().unix(),
                  image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD",
                  location: "New York",
                  title: "Event tilte",
                },
                editor: null, 
                typeFile: "image/jpeg" 
              },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          subject: "Parent information : Summer holidays date",
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
          ]
        },
        // photos
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {id: uniqueId(), type: "image", editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), type: "image", editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), type: "image", editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "Closing of the school",
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        // photos, audios, documents
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {id: uniqueId(), type: "image", editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), type: "audio", editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), type: "other", editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "subject 1",
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
          ]
        },
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 2",
          created: moment().subtract(5, "days").unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
          ]
        },
        //poll
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().subtract(5, "days").unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {
                id: uniqueId(),
                type: "poll",
                anonymous: true,
                ask: "ask",
                participate: true,
                result: true,
                date: moment().unix(),
                options: [
                  {
                    id: uniqueId(),
                    optionParentName: "options",
                    parent: null,
                    placeholder: "Option",
                    progress: 0,
                    userCheckedIt: false,
                    value: "test 1",
                  },
                  {
                    id: uniqueId(),
                    optionParentName: "options",
                    parent: null,
                    placeholder: "Option",
                    progress: 0,
                    userCheckedIt: false,
                    value: "test 2",
                  },
                ],
              },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "subject 2",
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 3",
          created: moment().subtract(5, "days").unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        //list
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().subtract(10, "days").unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {
                id: uniqueId(),
                type: "list",
                data: {
                  title: "dawdad",
                  options: [
                    {
                      id: uniqueId(),
                      optionParentName: "options",
                      parent: null,
                      placeholder: "Option",
                      value: "test 1",
                    },
                    {
                      id: uniqueId(),
                      optionParentName: "options",
                      parent: null,
                      placeholder: "Option",
                      value: "test 1",
                    }
                  ]
                }
              }
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "subject 3",
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 33",
          created: moment().subtract(40, "days").unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        // photos
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().subtract(5, "days").unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "subject 4",
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
          ]
        },
        // photos
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().subtract(15, "days").unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "subject 5",
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
      ]
    },
    //page 2
    {
      page: 1,
      messages: [
        // photos
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().subtract(5, "days").unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          subject: "subject 6",
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
          ]
        },
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 4",
          created: moment().unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 5",
          created: moment().unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        // photos
        {
          id: uniqueId(),
          type: "multimedia",
          from: "school",
          created: moment().subtract(5, "days").unix(),
          statistic: {
            views: 32,
            viewsOf: 67,
            reactions: 46,
            reactionsOf: 83,
            comments: 21,
            commentsOf: 61,
          },
          message: {
            attachments: [
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
              {id: uniqueId(), editor: null, base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…tkYEE0RZ48Xfvo3ljLEUX9OlAaM9rKFF18j7X8azpqUP3E//Z", thumb: null, typeFile: "image/jpeg" },
            ],
            text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          },
          text: "tdeafesfse↵sfefsefesfesfesfes fesfesfesfes",
          subject: "subject 7",
          to: [
            {value: "C00JV72IKNA", label: "CE1 B"}
          ]
        },
        {
          id: uniqueId(),
          type: "sms",
          message: "SMS message 6",
          created: moment().unix(),
          statistic: {
            sent: 24,
            opened: 16,
            openedOf: 61,
          },
          id: uniqueId(),
          to: [
            {value: "C00JU9WDLIP", label: "CP A"},
          ]
        },

      ]
    }
  ],
  
}