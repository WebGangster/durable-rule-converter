'use strict';

var expect = require('chai').expect;
var ruleConverter = require('../index');

describe('#ruleConverter', function() {
    it('should convert sample rule', function() {
        var inputData = {
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
                            "operator": "not_equal",
                            "value": 90.5
                        },
                        {
                            "condition": "AND",
                            "rules": [{
                                "id": "in_stock",
                                "field": "in_stock",
                                "type": "integer",
                                "input": "radio",
                                "operator": "less_or_equal",
                                "value": 100
                            }]
                        }
                    ]
                }
            ],
            "valid": true
        };

        var output = JSON.stringify({
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
						"$neq": {
							"category": 90.5
						}
					}, {
						"$and": [{
							"$lte": {
								"in_stock": 100
							}
						}]
					}]
				}]
			}
		});

        var result = JSON.stringify(ruleConverter(inputData));

        expect(result).to.equal(output);
    });
});