import yaml

def update_prometheus_targets(ip_addresses):
    filename = 'prometheus.yml'

    with open(filename, 'r') as file:
        data = yaml.safe_load(file)

    # Find the 'blackbox' job, append new IPs to its targets while avoiding duplicates
    for job in data.get('scrape_configs', []):
        if job['job_name'] == 'blackbox':
            current_targets = set(job['static_configs'][0]['targets'])
            updated_targets = current_targets.union(ip_addresses)
            job['static_configs'][0]['targets'] = list(updated_targets)
            break
    # filename = 'prometheus_test.yml'
    with open(filename, 'w') as file:
        yaml.dump(data, file, sort_keys=False)

def validate_yaml(filename):
    try:
        with open(filename, 'r') as file:
            yaml.safe_load(file)
        return True
    except yaml.YAMLError as exc:
        print(f"Error in configuration file: {exc}")
        return False
if __name__ == '__main__':
    update_prometheus_targets(['8.8.8.8', '10.0.0.1', '192.168.1.1'])
    is_valid = validate_yaml('prometheus_test.yml')
    if is_valid:
        print("YAML file is valid")
    else:
        print("YAML file is invalid")