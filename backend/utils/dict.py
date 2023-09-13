def dissoc(dict, fields):
    new_dict = {**dict}

    for field in fields:
        new_dict.pop(field)

    return new_dict
