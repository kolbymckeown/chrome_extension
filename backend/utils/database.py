class find:
    def __init__(self, model, filter):
        self.db_entries = model.query.filter_by(**filter).all()

    def json(self):
        return [item.json() for item in self.db_entries]


def find_one(model, filter):
    result = model.query.filter_by(**filter).first()
    return result


def get_models(model, filter):
    return model.query.filter_by(**filter).all()
