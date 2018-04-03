# [durable-rule-converter](https://github.com/aravindnc/durable-rule-converter)

This is a simple library to convert rules created from jQuery Query Builder to Durables Rules Engine

Durables Rules Engine - https://github.com/jruizgit/rules
jQuery Query Builder - http://querybuilder.js.org

## Installation

  `npm install durable-rule-converter`

## Usage

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

## Sample Rule Output

    {
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

This is the first version of the library, which you can use for your basic needs if you are using Durable Rules Engine.