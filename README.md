# [durable-rule-converter](https://github.com/aravindnc/durable-rule-converter)

This is a simple library to convert rules created from jQuery Query Builder to Durables Rules Engine

Dependencies
- jQuery Query Builder - http://querybuilder.js.org
- Durables Rules Engine - https://github.com/jruizgit/rules

## Installation

  `npm install durable-rule-converter`

## Create Rule using Query Builder

### Step 1 - Create rule
Navigate to https://querybuilder.js.org/demo.html for a demo or implement a rule builder using query builder. A sample of query builder is given below.

![Query Builder Demo](https://github.com/aravindnc/durable-rule-converter/blob/master/docs/img/query-builder-demo.png)

### Step 2 - Get the rule output
After creating your rule, click the 'Get Rules' button and you will get below JSON as the output. You can use your own custom implementation to get the output from query builder.

The output form Query Builder will be like below,
```javascript
{
    "condition": "AND",
    "rules": [{
            "id": "price",
            "field": "price",
            "type": "double",
            "input": "number",
            "operator": "less",
            "value": 10.25
        },
        {
            "condition": "OR",
            "rules": [{
                    "id": "category",
                    "field": "category",
                    "type": "integer",
                    "input": "select",
                    "operator": "equal",
                    "value": 2
                },
                {
                    "id": "category",
                    "field": "category",
                    "type": "integer",
                    "input": "select",
                    "operator": "equal",
                    "value": 1
                },
                {
                    "condition": "AND",
                    "rules": [{
                        "id": "in_stock",
                        "field": "in_stock",
                        "type": "integer",
                        "input": "radio",
                        "operator": "equal",
                        "value": 1
                    }]
                }
            ]
        }
    ],
    "valid": true
};
```
### Step 3 - Build the input for rules engine
So, we have the query builder input and now we are going to convert it to a rule defenition which is the input for durable rules engine.

```javascript
    const RuleConverter = require('durable-rule-converter');

    // output from jQuery Query Builder
    var ruleInput = {
        "condition": "AND",
        "rules": [{
                "id": "price",
                "field": "price",
                "type": "double",
                "input": "number",
                "operator": "less",
                "value": 10.25
            },
            {
                "condition": "OR",
                "rules": [{
                        "id": "category",
                        "field": "category",
                        "type": "integer",
                        "input": "select",
                        "operator": "equal",
                        "value": 2
                    },
                    {
                        "id": "category",
                        "field": "category",
                        "type": "integer",
                        "input": "select",
                        "operator": "equal",
                        "value": 1
                    },
                    {
                        "condition": "AND",
                        "rules": [{
                            "id": "in_stock",
                            "field": "in_stock",
                            "type": "integer",
                            "input": "radio",
                            "operator": "equal",
                            "value": 1
                        }]
                    }
                ]
            }
        ],
        "valid": true
    };

    var output = RuleConverter(ruleInput);
```
And the output will be,
```javascript
    {
        "m": {
            "$and": [{
                "$lt": {
                    "price": 10.25
                }
            }, {
                "$or": [{
                    "$eq": {
                        "category": 2
                    }
                }, {
                    "$eq": {
                        "category": 1
                    }
                }, {
                    "$and": [{
                        "$eq": {
                            "in_stock": 1
                        }
                    }]
                }]
            }]
        }
    }
```

You can use the above definition in durable rules engine like below JSON format,
```javascript
    {
        "myRule$state": {
            "input": {
                "t_0": {
                    "all": [<PUT-THE-ABOVE-OUTPUT-HERE>],
                    "to": "done",
                    "run": "done"
                },
            },
            "done": {},
        }
    }
```

Reference for JSON rules for Durable Rules Engine,
- https://github.com/jruizgit/rules/blob/master/docs/json/reference.md


## Supported Operations

Currently the library support below operations only,

- Equal
- Less Than
- Less Than or Equal To
- Greater Than
- Greater Than or Equal To

This is the draft version of the library, which you can use for your basic needs if you are using Durable Rules Engine.
